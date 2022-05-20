import { getAllStation, getBikeNumber, getStationByID } from "../../../../Services/AdminService";

export async function getListStation() {
    try {
        const listStations = await getAllStation();
        if (listStations.status === "success") {
            const listID = []
            const listStation = listStations.data;
            for (let i = 0; i < listStation.length; i++) {
                listID.push({
                    id: listStation[i]._id,
                    name: listStation[i].name,
                })

            }

            return listID;
        }
        return "Failed to fetch";
    } catch (error) {
        console.log(error)
        return "Failed to fetch";
    }
}
export async function getByID(id) {
    try {
        const station = await getStationByID(id);
        if (station.status === "success") {
            let numOfBikeFree = 0, numOfBikeHiring = 0, numOfBikeWaiting = 0, numOfBikeBreakdown = 0;
            const statistic = station.statistic;
            for (let i = 0; i < statistic.length; i++) {
                numOfBikeFree+= statistic[i].free;
                numOfBikeHiring += statistic[i].hiring;
                numOfBikeWaiting += statistic[i].waiting;
                numOfBikeBreakdown += statistic[i].breakdown;
            }

            return {
                free: numOfBikeFree,
                hiring: numOfBikeHiring,
                waiting: numOfBikeWaiting,
                repair: numOfBikeBreakdown,
            }
        }
        return "Failed to fetch";
    } catch (error) {
        console.log(error)
        return "Failed to fetch";
    }
}

export async function getNumberBike(id) {
    try {
        const station = await getStationByID(id);
        if (station.status === "success") {
            const statistic = station.statistic;
            const listBikeCategory = []
            for (let i = 0; i < statistic.length; i++) {
                listBikeCategory.push({
                    bikeName: statistic[i].category?.name,
                    bikeNumber: statistic[i].free + statistic[i].hiring + statistic[i].waiting + statistic[i].breakdown, 

                })
            }

            return listBikeCategory;
        }
        return "Failed to fetch";
    } catch (error) {
        console.log(error)
        return "Failed to fetch";
    }
}