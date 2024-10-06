import { SoundSettings } from "../../types";
import Api from "./Api";

export const fetchSoundPreferences = async () : Promise<any> => {
  try {
    const response = await Api.get<SoundSettings>('/sound-settings');
    return response.data;
  } catch (error) {
    console.error('Erorr fetching tasks:', error);
    throw error;
  }
}

export const updateSoundPreference = async (soundSettings: Omit<SoundSettings, 'id'>): Promise<SoundSettings> => {
  try {
    const response = await Api.put<SoundSettings>(`/sound-settings`, soundSettings);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export const editSoundPreference = async (soundSettings: Partial<any>): Promise<any> => {
  try {
    const response = await Api.put<any>(`/sound-settings`, soundSettings);
    return response.data;
  } catch (error) {
    console.log('Error editing task:', error);
    throw error;
  }
}