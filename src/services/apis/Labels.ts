import { CreateLabelDto, Label } from "../../utils/types";
import Api from "./Api";
import { requestHandler } from "./RequestHandler";

export const fetchLabels = requestHandler<{}, Label[]>(async () => {
  return await Api.get('/labels');
});

export const createLabel = async (taskData: CreateLabelDto): Promise<Label> => {
  try {
    const response = await Api.post<Label>('/labels', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export const updateLabel = async (taskId: string, taskData: Omit<Label, 'id'>): Promise<Label> => {
  try {
    const response = await Api.put<Label>(`/labels/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export const editLabel = async (taskId: string, taskData: Partial<Label>): Promise<Label> => {
  try {
    const response = await Api.patch<Label>(`/labels/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.log('Error editing task:', error);
    throw error;
  }
}

export const deleteLabel = async (taskId: string): Promise<void> => {
  try {
    await Api.delete(`/labels/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}