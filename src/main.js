import './tailwind.css'

const appRoot = document.querySelector('#app')
appRoot.innerHTML = ''

function createCounterButton() {
  let count = 0
  const button = document.createElement('button')
  button.type = 'button'
  button.className = [
    'px-4',
    'py-2',
    'rounded-lg',
    'bg-indigo-600',
    'text-white',
    'font-medium',
    'shadow-sm',
    'hover:bg-indigo-700',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-indigo-500',
    'focus:ring-offset-2',
    'transition-colors'
  ].join(' ')
  const update = () => {
    button.textContent = `Compteur: ${count}`
  }
  button.addEventListener('click', () => {
    count += 1
    update()
  })
  update()
  return button
}

function renderApp() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6'

  const card = document.createElement('div')
  card.className = 'w-full max-w-md bg-white rounded-2xl shadow p-8 ring-1 ring-gray-100'

  const title = document.createElement('h1')
  title.className = 'text-2xl font-semibold tracking-tight mb-4'
  title.textContent = 'JS + Tailwind, sans HTML/CSS personnalisés'

  const subtitle = document.createElement('p')
  subtitle.className = 'text-gray-600 mb-6'
  subtitle.textContent = 'Interface générée en JavaScript avec classes Tailwind.'

  const counter = createCounterButton()

  card.appendChild(title)
  card.appendChild(subtitle)
  card.appendChild(counter)
  page.appendChild(card)
  appRoot.appendChild(page)
}

renderApp()
