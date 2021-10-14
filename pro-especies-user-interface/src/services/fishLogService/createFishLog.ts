import AsyncStorage from "@react-native-async-storage/async-storage";
import fishLogService from "./fishService"

export const createFishLog = async (
    photo: string | null | undefined,
    name: string | null,
    largeGroup: string | null,
    group: string | null,
    species: string | null,
    weight: number | null,
    length: number | null,
    coordenates: number | null,
) => {
    const userId = await AsyncStorage.getItem("@eupescador/userId");
    const token = await AsyncStorage.getItem("@eupescador/token");
    const config = {
        headers:{Authorization:`Bearer ${token}`}
    }
    await fishLogService.post(
        '/fishLog', 
        {
            userId,
            name,
            largeGroup,
            group,
            species,
            coordenates,
            photo,
            length,
            weight,
        },
        config
    );
}