import { deleteStationService, getAllStation, getStationByID, getStationByName} from "../../../Services/StaffService";


export async function getStation() {
    try {
        const listStation = await getAllStation();
        console.log(listStation)
        if (listStation.status === "success") {
            return listStation.data;
        }
        return "Failed to fetch";
    } catch (error) {
        console.log(error)
        return "Failed to fetch";;
    }
}
export async function getByName(name) {
    try {
        const liststation = await getStationByName(name);
        if (liststation.status == "success") {
            return liststation.data;
        }
        return "Failed to fetch";
    } catch (error) {
        console.log(error)
        return "Failed to fetch";;
    }
}

export async function getByID(id) {
    try {
        const station = await getStationByID(id);
        if (station.status === "success") {
            let numOfBike = 0;
            const statistic = station.statistic;
            const listBikeCategory = []
            for (let i = 0; i < statistic.length; i++) {
                numOfBike += statistic[i].hiring + statistic[i].waiting + statistic[i].free + statistic[i].breakdown;
                listBikeCategory.push({
                    imagePath: statistic[i].category?.image,
                    bikeName: statistic[i].category?.name,
                    status: {
                        free: statistic[i].free,
                        hiring: statistic[i].hiring,
                        waiting: statistic[i].waiting,
                        breakdown: statistic[i].breakdown
                    }

                })
            }

            return {
                id:station.data[0]._id,
                stationName: station.data[0].name,
                listBikeCategory: listBikeCategory,
                numOfBike: numOfBike,
                staffName: station.data[0].staff.name,
                staffID: station.data[0].staff.staffID,
                staffEmail: station.data[0].staff.email,
                hotLine: station.data[0].phoneNumber,
                locationID: station.data[0].location?._id

            }
        }
        return "Failed to fetch";
    } catch (error) {
        console.log(error)
        return "Failed to fetch";
    }
}


export async function deleteStation(id){
    try{
        const result = await deleteStationService(id);
        if(result.status==="success"){
            return result;
        }else{
            return "Failed to delete"
        }
    }catch(error){
        console.log(error);
        return "Failed to delete"
    }
}