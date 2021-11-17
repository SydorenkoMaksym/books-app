export const loadBooks = () => 
  fetch("https://fakerestapi.azurewebsites.net/api/v1/Books")
    .then(r => r.json());