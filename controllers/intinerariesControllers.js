const Intinerary = require('../models/intinerary')

const intinerariesControllers = {
    getIntineraries: async (req, res) => {
        let intineraries
        let error = null
        try {
            intineraries = await Intinerary.find().populate("city")
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { intineraries },
            success: error ? false : true,
            error: error,
            consola: console.log(error)
        })
    },
    getOneIntinerary: async (req, res) => {
        const id = req.params.id
        let intinerary
        let error = null
        try {
            intinerary = await Intinerary.findOne({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { intinerary },
            success: error ? false : true,
            error: error
        })
    }
    ,
    addIntinerary: async (req, res) => {
        const {  publisher, imagePublisher, price, duration, hashtags, likes, activities, city } = req.body.data
        let intinerary
        let error = null
        try {
            intinerary = await new Intinerary({
                publisher: publisher,
                imagePublisher: imagePublisher,
                price: price,
                duration: duration,
                hashtags: hashtags,
                likes: likes,
                activities: activities,
                city: city
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : intinerary,
            success: error ? false : true,
            error: error
        })
    },
    modifyIntinerary: async (req, res) => {
        const id = req.params.id
        const intinerary = req.body.data
        let intinerarydb
        let error = null
        try {
            intinerarydb = await Intinerary.findOneAndUpdate({ _id: id }, intinerary, { new: true })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : intinerarydb,
            success: error ? false : true,
            error: error
        })
    },
    removeIntinerary: async (req, res) => {
        const id = req.params.id
        let intinerary
        let error = null
        try {
            intinerary = await Intinerary.findOneAndDelete({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : intinerary,
            success: error ? false : true,
            error: error
        })
    },
    
    multiplesIntineraries: async (req, res) => {
        let intinerary = []
        const data= req.body.data
        let error = null
        try {
            data.map(async (item) => {
                await new Intinerary({
                    name: item.name,
                    country: item.country,
                    description: item.description,
                    image: item.image
                }).save()
            })
        } catch (err) { error = err }
        intinerary = await Intinerary.find()
        res.json({
            response: error ? 'ERROR' : intinerary,
            success: error ? false : true,
            error: error
        })
    },

    getItineraryByCity: async(req, res) => {
        let itineraries = [];
        const id = req.params.id;
        const error = null;
        try{
            itineraries = await Intinerary.find({ city : id })
            .populate("city")
            .populate("activities")

        }catch(err){ error = err }
        res.json({
            res: error ? 'ERROR' : itineraries ,
            success: error ? false : true,
            error: error
        })
    }

    // likeDislike: async (req, res) => {
    //     const id = req.params.id //LLEGA POR PARAMETRO DESDE AXIOS
    //     const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT

    //     await Places.findOne({ _id: id })

    //         .then((place) => {
             
    //             if (place.likes.includes(user)) {
    //                 Places.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })//PULL QUITA, SACA
    //                     .then((response) => res.json({ success: true, response: response.likes }))
    //                     .catch((error) => console.log(error))
    //             } else {
    //                 Places.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })//PUSH AGREGA
    //                     .then((response) => res.json({ success: true, response: response.likes }))
    //                     .catch((error) => console.log(error))
    //             }
    //         })
    //         .catch((error) => res.json({ success: false, response: error }))
    // }



}

module.exports = intinerariesControllers
