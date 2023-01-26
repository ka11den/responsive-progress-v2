const btn = document.querySelector('#btn'),
      modal = document.querySelector('#modal'),
      close = document.querySelector('#close'),
      error = document.querySelector('#error'),
      name1 = document.getElementById('name'),
      phone1 = document.getElementById('phone'),
      email1 = document.getElementById('email')

btn.addEventListener('click', () => {
  modal.classList.add('snow')
})

close.addEventListener('click', () => {
  modal.classList.remove('snow')
})

function sendEmail () {
  let params = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
  }

  const serviceID = 'service_tx60lkj'
  const templateID = 'template_h61ykba'

  let checkbox = document.querySelector('#checkbox');
  
  if (checkbox.checked && localStorage.getItem('localStorageData') === null) {
    if (document.getElementById('name').value === '' || document.getElementById('email').value === '' || document.getElementById('phone').value === '') {
      // add message
      error.textContent = localStorage.getItem('localStorageData') !== null ? "вы уже отправили сообщение" : "заполните форму"
      name1.classList.add("error")
      phone1.classList.add("error")
      email1.classList.add("error")
      // remove styles
      setTimeout(() => {
        error.textContent = ''
        name1.classList.remove("error")
        phone1.classList.remove("error")
        email1.classList.remove("error")
      }, 3000)
    } else {
      localStorage.setItem('localStorageData', JSON.stringify('send'))
      emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
          sendEmailAdmin(params)
          document.getElementById('name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('phone').value = '';
          
          // add message
          error.textContent = "Сообщение успешно отправлено!"
  
          // error message
          setTimeout(() => {
            error.textContent = ''
          }, 3000)
      })
      .catch((err) => console.log("Заполните форму"))
    }   
  } else {    
    // add message
    error.textContent = localStorage.getItem('localStorageData') !== null ? "вы уже отправили сообщение" : "поставьте галочку"

    // error message
    setTimeout(() => {
      error.textContent = ''
    }, 3000)
  }
}

function sendEmailAdmin (params) {

  const serviceID = 'service_tx60lkj'
  const templateID = 'template_sndntlo'

  emailjs.send(serviceID, templateID, params).then((res) => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
  })
  .catch((err) => console.log("Заполните форму"))
}

const btns = document.querySelectorAll('.home__btn')
const isDarkTheme = window?.matchMedia('(prefers-color-schema: dark)').matches

btns.forEach((btn) => {
  isDarkTheme ? btn.classList.add('white') : ''
})

function clearCookie() {
  setTimeout(() => {
    localStorage.clear()
  }, 36000)
}

clearCookie()