import axios from "axios";

 const instace=axios.create({
  baseURL:'https://api.themoviedb.org/3' ,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTE5MDM2OGZiZjljYTM0Nzc5NzQ0ZDk2YWE4MjgwNyIsInN1YiI6IjY0Nzg2ZDMzMTc0OTczMDBjMTMxMDU2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ojfk7rKYzo2OE0ulo3YnaUF5ONiMdpw7J5v8KKv1_qE'
  }
})

export default instace
