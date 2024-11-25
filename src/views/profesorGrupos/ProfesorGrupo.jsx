import { useEffect, useState } from 'react'
import { useNavigate, useParams, useOutletContext } from 'react-router-dom'
import {
  addStudentsToGroup,
  deleteStudentFromGroup,
  getEstudiantes,
  getGroupById,
} from '../../util/services/grupoService'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
} from '@coreui/react'
import Autosuggest from 'react-autosuggest'
import Swal from 'sweetalert2'

const ProfesorGrupo = () => {
  const user = useOutletContext()

  const { id } = useParams()
  const [grupo, setGrupo] = useState({ estudiantes: [] })
  const [modalAddStudentVisible, setModalAddStudentVisible] = useState(false)
  const currentGrupoId = id
  const [suggestions, setSuggestions] = useState([])

  const [nombre, setNombre] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [grupos, setGrupos] = useState([])
  const [students, setStudents] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [newStudentEmail, setNewStudentEmail] = useState('')
  const [selectedNewStudents, setSelectedNewStudents] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getGroupById(id).then((el) => {
      console.log(el)
      
      setGrupo(el)

      getEstudiantes().then(el => setStudents(el))
    })
  }, [])

  const handleFileChangeAddStudents = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const updatedNewStudents = []
    const file = e.target.files[0]

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const emailsArray = result.data
            .map((row) => row.correo || row.email)
            .filter((email) => email)
          const uniqueCsvStudents = emailsArray.filter(
            (email) => !updatedNewStudents.includes(email),
          )
          setSelectedNewStudents(uniqueCsvStudents)
          console.log('Estudiantes agregados desde CSV:', uniqueCsvStudents) // Verificar correos añadidos desde CSV
        },
        header: true,
      })
    }
  }

  const handleFileUpload = (file, updatedStudents) => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const emailsArray = result.data
            .map((row) => {
              return { email: row.email ?? row.correo, nombre: row.nombre }
            })
            .filter((email) => email.email)
          const csvStudents = emailsArray.map((email) => ({
            email: email.email,
            fromCSV: true,
            nombre: email.nombre,
          }))

          const uniqueCsvStudents = csvStudents.filter(
            (csvStudent) =>
              !updatedStudents.some(
                (selectedStudent) => selectedStudent.email === csvStudent.email,
              ),
          )

          setSelectedStudents(uniqueCsvStudents)
          console.log('Estudiantes agregados desde CSV:', uniqueCsvStudents) // Verificar correos añadidos desde CSV
        },
        header: true,
      })
    }
  }

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : students.filter((student) =>
          student.email.toLowerCase().includes(inputValue),
        )
  }

  const getSuggestionValue = (suggestion) => suggestion.email

  const renderSuggestion = (suggestion) => <div>{suggestion.email}</div>

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const onSuggestionSelected = (event, { suggestion }) => {
    if (
      !selectedStudents.some((student) => student.email === suggestion.email)
    ) {
      setSelectedStudents([...selectedStudents, suggestion])
    }
    setEmails('') // Limpiar el campo de búsqueda después de seleccionar un estudiante
  }

  const clearForm = () => {
    setNombre('')
    setEmails('')
    setSelectedStudents([])
    document.getElementById('file').value = null // Limpiar el input del archivo CSV
  }

  const handleDeleteEstudiante = (estudianteEmail, grupoId) => {
    deleteStudentFromGroup(grupoId, estudianteEmail)
      .then(() => {
        setGrupo({
          ...grupo,
          estudiantes: grupo.estudiantes.filter(
            (est) => est.email !== estudianteEmail,
          ),
        })
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El estudiante ha sido eliminado.',
          icon: 'success',
        })
      })
      .catch((error) => {
        console.error('Error eliminando estudiante:', error)
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al eliminar el estudiante.',
          icon: 'error',
        })
      })
  }

  const handleAddStudentsToGroup = (e) => {
    e.preventDefault()
    console.log('Correo ingresado:', newStudentEmail) // Verificar el correo ingresado
    console.log('ID del Grupo:', currentGrupoId) // Verificar la ID del grupo

    if (selectedNewStudents.length === 0) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, ingresa al menos un correo de estudiante.',
        icon: 'warning',
      })
      return
    }

    console.log(
      'Enviando solicitud para añadir estudiantes:',
      selectedNewStudents,
    ) // Verificar estudiantes seleccionados
    addStudentsToGroup(currentGrupoId, selectedNewStudents)
      .then((response) => {
        console.log('Respuesta del servidor:', response) // Verificar respuesta del servidor

        // Hacer una solicitud adicional para obtener la información actualizada del grupo
        getGroupById(currentGrupoId)
          .then((updatedGrupo) => {
            setGrupos((prevGrupos) =>
              prevGrupos.map((grupo) =>
                grupo.id === currentGrupoId ? updatedGrupo : grupo,
              ),
            )
            setSelectedNewStudents([])
            setModalAddStudentVisible(false)
            Swal.fire({
              title: '¡Añadidos!',
              text: 'Los estudiantes han sido añadidos.',
              icon: 'success',
            })
          })
          .catch((groupError) => {
            console.error(
              'Error al obtener la información del grupo:',
              groupError,
            )
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al obtener la información del grupo.',
              icon: 'error',
            })
          })
      })
      .catch((error) => {
        console.error('Error añadiendo estudiantes:', error)
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al añadir los estudiantes.',
          icon: 'error',
        })
      })
  }

  return (
    <>
    <CAlert color="info" className="mb-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#d3d3d3', border:'#d3d3d3', color:'black',padding: '0.5rem' ,margin: '0'}}>
        <span>Profesor {user.nombre}</span>
        <CButton color="secondary" className="ml-auto" onClick={() => navigate('/grupos/')}>
          Volver
        </CButton>
      </CAlert>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <span>Lista de Estudiantes Grupo - {grupo.nombre}</span>
          <CButton
            color="success"
            size="md"
            style={{
              color:"white"
            }}
            onClick={(e) => {
              e.stopPropagation()
              setModalAddStudentVisible(true)
            }}
          >
            {' '}
            Añadir Estudiantes{' '}
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Correo</CTableHeaderCell>
                <CTableHeaderCell>Eliminar</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {grupo.estudiantes.map((estudiante) => (
                <CTableRow key={estudiante.email}>
                  <CTableDataCell>{estudiante.nombre}</CTableDataCell>
                  <CTableDataCell>{estudiante.email}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() =>
                        handleDeleteEstudiante(estudiante.email, grupo.id)
                      }
                    >
                      {' '}
                      -{' '}
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CModal
        visible={modalAddStudentVisible}
        onClose={() => {
          setModalAddStudentVisible(false);
          setNewStudentEmail('');
          setSelectedNewStudents([]);
        }}
      >
        <CModalHeader onClose={() => setModalAddStudentVisible(false)}>
          <CModalTitle>Agregar Estudiantes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={(e) => {
            e.preventDefault();
            handleAddStudentsToGroup(e);
          }}>
            <CFormLabel htmlFor="newStudentEmail">
              Correo del Estudiante
            </CFormLabel>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={{
                id: 'newStudentEmail',
                placeholder: 'Escribe un correo electrónico',
                value: newStudentEmail,
                onChange: (e, { newValue }) => setNewStudentEmail(newValue),
              }}
              onSuggestionSelected={(event, { suggestion }) => {
                if (!selectedNewStudents.includes(suggestion.email)) {
                  setSelectedNewStudents([
                    ...selectedNewStudents,
                    suggestion.email,
                  ]);
                }
                setNewStudentEmail('');
              }}
            />
            <CFormLabel htmlFor="file" className="mt-3">
              Subir archivo CSV (Columnas: correo, nombre)
            </CFormLabel>
            <CFormInput
              type="file"
              id="file"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const csvData = event.target.result;
                      const lines = csvData.split('\n');
                      
                      // Skip header row and process the rest
                      const newStudents = lines.slice(1)
                        .map(line => {
                          const [email] = line.split(',');
                          return email.trim();
                        })
                        .filter(email => {
                          // Validate email format and check for duplicates
                          const isValidEmail = email && /\S+@\S+\.\S+/.test(email);
                          const isDuplicate = selectedNewStudents.includes(email);
                          if (!isValidEmail && email !== '') {
                            console.warn(`Email inválido encontrado: ${email}`);
                          }
                          return isValidEmail && !isDuplicate;
                        });

                      if (newStudents.length > 0) {
                        setSelectedNewStudents(prevStudents => {
                          const updatedStudents = [...prevStudents, ...newStudents];
                          return [...new Set(updatedStudents)]; // Remove any duplicates
                        });
                        Swal.fire({
                          title: '¡Archivo procesado!',
                          text: `Se han añadido ${newStudents.length} correos válidos.`,
                          icon: 'success',
                        });
                      } else {
                        Swal.fire({
                          title: 'Archivo vacío',
                          text: 'No se encontraron correos válidos en el archivo CSV.',
                          icon: 'warning',
                        });
                      }
                    } catch (error) {
                      console.error('Error procesando el archivo CSV:', error);
                      Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al procesar el archivo CSV.',
                        icon: 'error',
                      });
                    }
                  };
                  reader.readAsText(file);
                }
              }}
            />

            <CFormLabel className="mt-3">Estudiantes seleccionados</CFormLabel>
            <div className="border rounded p-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {selectedNewStudents.length > 0 ? (
                <ul className="list-unstyled m-0">
                  {selectedNewStudents.map((email) => (
                    <li key={email} className="d-flex justify-content-between align-items-center mb-2">
                      {email}
                      <CButton
                        color="danger"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedNewStudents(prevStudents =>
                            prevStudents.filter(e => e !== email)
                          );
                        }}
                      >
                        ×
                      </CButton>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted m-0">No hay estudiantes seleccionados</p>
              )}
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setModalAddStudentVisible(false);
              setNewStudentEmail('');
              setSelectedNewStudents([]);
            }}
          >
            Cancelar
          </CButton>
          <CButton
            color="success"
            onClick={(e) => handleAddStudentsToGroup(e)}
            disabled={selectedNewStudents.length === 0}
            style={{color:"white"}}
          >
            Agregar Estudiantes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ProfesorGrupo
