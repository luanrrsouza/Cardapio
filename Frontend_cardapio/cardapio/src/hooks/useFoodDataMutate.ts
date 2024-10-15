import axios, { AxiosResponse } from "axios";
import { FoodData } from "../interface/FoodData";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: FoodData): Promise<AxiosResponse<any>> => {
  const response = await axios.post(API_URL + "/food", data);
  return response;
};

export function useFoodDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food-data"] });
    },
  });

  return mutate;
}
