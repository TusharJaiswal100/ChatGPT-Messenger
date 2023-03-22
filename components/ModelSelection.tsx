'use client'

import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json()); // calling the api // passing it to json

function ModelSelection() {
  const {data: models, isLoading} = useSWR("models", fetchModels); // here in place of "models" is a key but we can write it anything 
  // above line will fetch information
  const { data: model, mutate: setModel  } = useSWR("model", { // here initially  "text-davinci-003" will be diplayed and when user select option then that model will be displayed
    fallbackData: "text-davinci-003",
  });
   
  return (
    <div className="mt-2">
        <Select
           className="mt-2"
           options = {models?.modelOptions} // what options we have to show when selecting 
           defaultValue={model}
           placeholder={model}
           isSearchable       // we can search by typing
           isLoading = {isLoading}
           menuPosition = "fixed"
           classNames={{
             control: (state) => "bg-[#434654] border-[#434654]",
           }}
           onChange={(e) => setModel(e.value)} // this will set the model on selecting
        />
    </div>
  )
} 

export default ModelSelection

// rather than peace of state which user select in the drop down list 
// we can have another catched value using useSWR