// Simple mock API that returns generated contacts after a short delay
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makePhone(i) {
  const a = 500 + (i % 400)
  const b = 100 + ((i * 7) % 800)
  const c = 1000 + ((i * 13) % 9000)
  return `(${a}) ${b}-${c}`
}

export default function fetchContacts(count = 30, delay = 700) {
  const firstNames = [
    'Olivia','Liam','Emma','Noah','Ava','Elijah','Sophia','Oliver','Isabella','Lucas',
    'Mia','Mason','Amelia','Ethan','Harper','Logan','Evelyn','James','Abigail','Benjamin',
    'Charlotte','Henry','Sofia','Alexander','Ella','Sebastian','Avery','Jack','Scarlett','Mateo'
  ]
  const lastNames = [
    'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez',
    'Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin'
  ]
  const relations = ['Friend','Colleague','Family','Acquaintance','Neighbor','Vendor','Client']

  return new Promise((resolve) => {
    setTimeout(() => {
      const now = Date.now()
      const contacts = Array.from({ length: count }).map((_, i) => {
        const first = randomFrom(firstNames)
        const last = randomFrom(lastNames)
        const name = `${first} ${last}`
        const relation = randomFrom(relations)
        const id = now + i
        return {
          id,
          name,
          phone: makePhone(i),
          email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
          address: `${100 + i} ${randomFrom(['Maple','Oak','Pine','Elm','Cedar'])} St, City ${i % 10}`,
          relation,
          photo: '', // no photos in mock
          favorite: Math.random() < 0.12,
        }
      })
      resolve(contacts)
    }, delay)
  })
}
