import axios from "axios";

const intinerariesActions = {
    getItineraryByCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/intinerarybycity/${id}`)
            
            dispatch({type: "FIND_INTINERARIES", payload:res.data.res})
        }
    },
    likeDislike: (id) => {
        const token = localStorage.getItem('token')
        return async () => {
            try {
                let response = await axios.put("http://localhost:4000/api/intineraries/likes/" + id, {},
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        }
                    })
                return response

            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default intinerariesActions;

// import axios from "axios";
// import apiUrl from "../../../url";

// //acciones que necesito paea mi app en un solo lugae
// const itinerariesActions = { //objeto. Contiene metodos, lo gurdo y quien lo necesite lo usa mediante llamados

//    getItineraries: () => { // metodo del objeto que es una fuincion que retorna una funcion anonima asincrona
//     return async (dispatch, getState) => { // funcion anonima asincrona. no se pone dispatch= porque no es un componente, los hooks se usan dentro de componentes
//         const res = await axios.get(apiUrl+"api/intineraries") // 2 se lo envio como parametro cuando llame al metodo. lo recibe hace una llamada a axios, ruta
//         console.log(res)
//         dispatch({type: "GETITINERARIES", payload:res.data.response.itineraries}) //1 recibe el dispatch desde el front, dispatch (va al reducer)es un hook. 3 cuando la recibe y cuando tiene la respuesta hace un dispatch, get itinerary, y le pasa payload (valor)
// //tipo de accion que voy a realizar y por otro lado payload que es el dato, esto se envia al main reduce y el itinerary reducer
//     }
//  },


//    getOneItinerary: (id) => {
//     return async(dispatch,getState) => {
//         const res = await axios.get(apiUrl+`api/intineraries/${id}`)
//         console.log(res)
//         dispatch ({type: 'GETONEITINERARY', payload: res.data.response})
//         return res
//     }
// },

// getItinerariesByCity: (id) => {
//     return async(dispatch,getState) => {
//         const res = await axios.get(apiUrl+`api/itinerarybycity/${id}`)
//         console.log(res)
//         dispatch ({type: 'GETITINERARIESBYCITY', payload: res.data.response})
//     }
// },

// likeDislike: (id) => {
//     const token = localStorage.getItem('token')
//     return async() => {
//         try {
//             const response = await axios.put(apiUrl+`api/intineraries/likeDislike/${id}`,{},
//                 {headers: {Authorization: "Bearer "+token}}
//             )
//             //console.log(answer.data.response)
//             return response.data.response
//         }catch (err) {
//             console.log(err)
//         }
//     }
// }