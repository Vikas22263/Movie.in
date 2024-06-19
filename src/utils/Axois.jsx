import axios from "axios";

 const instace=axios.create({
  baseURL:'https://api.themoviedb.org/3' ,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMThhOTRmYjgyOGI0ZjJlYjU4Yjk1NmQ3MWM3NGQ4MCIsInN1YiI6IjY0Nzg2ZDMzMTc0OTczMDBjMTMxMDU2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VQ7YwIyYGRgUvd4NZ6G7ERlmeTp2Oa8DLcajuZaz6RY'
  }
})

export default instace
