import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  useFormikContext,
} from 'formik'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialUser = {
  name: '',
  university: '',
  participants: [
    {
      fullName: '',
      email: '',
      role: '',
      age: '',
    },
  ],
  captain: {
    fullName: '',
    email: '',
    phoneNumber: '',
    role: 'leader',
    age: '',
  },
}

export function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  // Функция для отправки данных на сервер
  const registerUser = async (user) => {
    setIsSubmitting(true)
    setServerError('')
    try {
      const response = await axios.post(
        'http://147.45.109.194/api/register-team/',
        user
      )
      console.log('Регистрация успешна:', response.data)
      toast.success('Регистрация успешна:', response.data)
    } catch (error) {
      setServerError(error.response?.data?.message || 'Ошибка регистрации')
      toast.error('Ошибка при регистрации', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-20 w-[600px] bg-[white] mx-auto rounded-md px-5 py-7 border">
      <h1 className="font-bold text-center text-2xl">Регистрация команды</h1>
      <Formik
        initialValues={initialUser}
        validate={validateForm}
        onSubmit={registerUser}
      >
        {({ values }) => (
          <Form>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="name"
                name="name"
                label="Название команды"
                size="small"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-xs text-red-600"
              />
            </fieldset>

            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="university"
                name="university"
                label="Университет"
                size="small"
              />
              <ErrorMessage
                name="university"
                component="div"
                className="text-xs text-red-600"
              />
            </fieldset>

            <h2 className="font-bold text-xl my-3">Капитан команды</h2>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="captain.fullName"
                name="captain.fullName"
                label="Имя капитана"
                size="small"
              />
              <ErrorMessage
                name="captain.fullName"
                component="div"
                className="text-xs text-red-600"
              />
            </fieldset>

            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="captain.email"
                name="captain.email"
                label="Email капитана"
                size="small"
              />
              <ErrorMessage
                name="captain.email"
                component="div"
                className="text-xs text-red-600"
              />
            </fieldset>

            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="captain.phoneNumber"
                name="captain.phoneNumber"
                label="Телефон капитана"
                size="small"
              />
              <ErrorMessage
                name="captain.phoneNumber"
                component="div"
                className="text-xs text-red-600"
              />
            </fieldset>

            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="captain.role"
                name="captain.role"
                label="Роль капитана"
                size="small"
                disabled
              />
            </fieldset>

            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="captain.age"
                name="captain.age"
                label="Возраст капитана"
                size="small"
                type="number"
              />
              <ErrorMessage
                name="captain.age"
                component="div"
                className="text-xs text-red-600"
              />
            </fieldset>

            <h2 className="font-bold text-xl my-3">Участники команды</h2>
            <FieldArray name="participants">
              {({ push, remove }) => (
                <div>
                  {values.participants.map((_, index) => (
                    <div key={index} className="border p-4 mb-4">
                      <fieldset className="my-5">
                        <Field
                          as={TextField}
                          fullWidth
                          name={`participants.${index}.fullName`}
                          label={`ФИО участника ${index + 1}`}
                          size="small"
                        />
                        <ErrorMessage
                          name={`participants.${index}.fullName`}
                          component="div"
                          className="text-xs text-red-600"
                        />
                      </fieldset>
                      <fieldset className="my-5">
                        <Field
                          as={TextField}
                          fullWidth
                          name={`participants.${index}.email`}
                          label={`Email участника ${index + 1}`}
                          size="small"
                        />
                        <ErrorMessage
                          name={`participants.${index}.email`}
                          component="div"
                          className="text-xs text-red-600"
                        />
                      </fieldset>
                      <fieldset className="my-5">
                        <Field
                          as={Select}
                          fullWidth
                          name={`participants.${index}.role`}
                          label={`Роль участника ${index + 1}`}
                          size="small"
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            Выберите роль
                          </MenuItem>
                          <MenuItem value="Маркетолог">Маркетолог</MenuItem>
                          <MenuItem value="SMM-специалист">
                            SMM-специалист
                          </MenuItem>
                          <MenuItem value="Front-end разработчик">
                            Front-end разработчик
                          </MenuItem>
                          <MenuItem value="Back-end разработчик">
                            Back-end разработчик
                          </MenuItem>
                          <MenuItem value="UI/UX дизайнер">
                            UI/UX дизайнер
                          </MenuItem>
                          <MenuItem value="Графический дизайнер">
                            Графический дизайнер
                          </MenuItem>
                          <MenuItem value="Project Manager">
                            Project Manager
                          </MenuItem>
                          <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                          <MenuItem value="QA-инженер">QA-инженер</MenuItem>
                          <MenuItem value="DevOps-инженер">
                            DevOps-инженер
                          </MenuItem>
                          <MenuItem value="Контент-менеджер">
                            Контент-менеджер
                          </MenuItem>
                          <MenuItem value="Специалист по безопасности">
                            Специалист по безопасности
                          </MenuItem>
                          <MenuItem value="Бизнес-аналитик">
                            Бизнес-аналитик
                          </MenuItem>
                          <MenuItem value="Архитектор программного обеспечения">
                            Архитектор программного обеспечения
                          </MenuItem>
                          <MenuItem value="Мобильный разработчик">
                            Мобильный разработчик
                          </MenuItem>
                          <MenuItem value="Специалист по продукту">
                            Специалист по продукту
                          </MenuItem>
                          <MenuItem value="SEO-специалист">
                            SEO-специалист
                          </MenuItem>
                          <MenuItem value="Администратор баз данных">
                            Администратор баз данных
                          </MenuItem>
                          <MenuItem value="Инженер по машинному обучению">
                            Инженер по машинному обучению
                          </MenuItem>
                          <MenuItem value="Специалист по облачным технологиям">
                            Специалист по облачным технологиям
                          </MenuItem>
                          <MenuItem value="Специалист по интеграции">
                            Специалист по интеграции
                          </MenuItem>
                          <MenuItem value="Системный администратор">
                            Системный администратор
                          </MenuItem>
                          <MenuItem value="Фронтенд-тестировщик">
                            Фронтенд-тестировщик
                          </MenuItem>
                          <MenuItem value="Специалист по аналитике данных">
                            Специалист по аналитике данных
                          </MenuItem>
                          <MenuItem value="Специалист по виртуализации">
                            Специалист по виртуализации
                          </MenuItem>
                          <MenuItem value="Специалист по интернет-маркетингу">
                            Специалист по интернет-маркетингу
                          </MenuItem>
                          <MenuItem value="Специалист по интерфейсам">
                            Специалист по интерфейсам
                          </MenuItem>
                          <MenuItem value="Копирайтер">Копирайтер</MenuItem>
                          <MenuItem value="Специалист по email-маркетингу">
                            Специалист по email-маркетингу
                          </MenuItem>
                          <MenuItem value="Технический писатель">
                            Технический писатель
                          </MenuItem>
                          <MenuItem value="Product Manager">
                            Product Manager
                          </MenuItem>
                          <MenuItem value="Другое">Другое</MenuItem>
                        </Field>
                        <ErrorMessage
                          name={`participants.${index}.role`}
                          component="div"
                          className="text-xs text-red-600"
                        />
                      </fieldset>
                      <fieldset className="my-5">
                        <Field
                          as={TextField}
                          fullWidth
                          name={`participants.${index}.age`}
                          label={`Возраст участника ${index + 1}`}
                          size="small"
                          type="number"
                        />
                        <ErrorMessage
                          name={`participants.${index}.age`}
                          component="div"
                          className="text-xs text-red-600"
                        />
                      </fieldset>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => remove(index)}
                      >
                        Удалить участника
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      push({ fullName: '', email: '', role: '', age: '' })
                    }
                  >
                    Добавить участника
                  </Button>
                </div>
              )}
            </FieldArray>

            <SubmitButton isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
      {serverError && (
        <p className="text-center text-xs text-red-600">{serverError}</p>
      )}
    </div>
  )
}

// Компонент для кнопки отправки
function SubmitButton({ isSubmitting }) {
  const { isValidating, isValid } = useFormikContext()
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full"
      style={{ marginTop: 10 }}
      disabled={!isValid || isValidating || isSubmitting}
    >
      {isSubmitting ? 'Отправка...' : 'Отправить'}
    </Button>
  )
}

// Валидация формы
const validateForm = (values) => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  if (!values.university) {
    errors.university = 'Обязательное поле'
  }

  values.participants.forEach((participant, index) => {
    if (!participant.fullName) {
      errors[`participants.${index}.fullName`] = 'Обязательное поле'
    }
    if (!participant.email) {
      errors[`participants.${index}.email`] = 'Обязательное поле'
    }
    if (!participant.role) {
      errors[`participants.${index}.role`] = 'Обязательное поле'
    }
    if (!participant.age || participant.age < 0) {
      errors[`participants.${index}.age`] =
        'Возраст должен быть положительным числом'
    }
  })

  if (!values.captain.fullName) {
    errors['captain.fullName'] = 'Обязательное поле'
  }
  if (!values.captain.email) {
    errors['captain.email'] = 'Обязательное поле'
  }
  if (!values.captain.phoneNumber) {
    errors['captain.phoneNumber'] = 'Обязательное поле'
  }
  if (!values.captain.age || values.captain.age < 0) {
    errors['captain.age'] = 'Возраст должен быть положительным числом'
  }

  return errors
}
