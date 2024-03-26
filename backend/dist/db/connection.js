import mongoose from "mongoose";
export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB successfully!");
    }
    catch (error) {
        console.log(error);
        throw new Error("Could not connect to DB");
    }
};
export const disconnectFromDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from DB successfully!");
    }
    catch (error) {
        console.log(error);
        throw new Error("Could not disconnect from DB");
    }
};
//# sourceMappingURL=connection.js.map