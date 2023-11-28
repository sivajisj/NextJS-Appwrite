import mongoose from "mongoose";

export async function connect(){

    try {
        await mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;
        
     

        connection.on("connected", () => {
            console.log("Connected to MongoDB ");
        });

        connection.on("error", (err) => {
            console.log("Mongodb connection error Error: " + err);
        });


    } catch (error) {
       console.log("Something goes wrong!");
        
       console.log(error);
       
    }
    
}