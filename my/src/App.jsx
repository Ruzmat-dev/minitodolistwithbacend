import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function App() {
  const [formData, setFormData] = useState({ name: '', date: moment().format('LTS') });
  const [loading, setLoading] = useState(false)
  const [confData , setConfData] = useState(false)
  const [data, setData] = useState([]);
 


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (formData.name.length > 2) {
      setLoading(true)
      await axios
        .post('http://localhost:3000/api/data', formData)
        .then((response) => {
          if (response) {
            setFormData({ name: '', date: moment().format('LTS') });
            fetchData()
            setLoading(false)
            toast.success("Done")
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false)
          toast.error("Error")
        });
    } else {
      toast.error("Error")
    }

  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/data')
      if (response) setData(response.data)
    } catch (error) {
      console.error('Error:', error)
    }

  }



  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/data/${id}`)
      if (res) {
        fetchData()
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };


  const EditItem = () => {

  }

  const clearData = async () => {
    confirmAlert({
      title: "Ochirasizmi ? ",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => confData ? setConfData(false) : setConfData(true)
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        }
      ]
      
    })  

    if(confData) {
      try {
        const res = await axios.get('http://localhost:3000/api/data/clearData')
        console.log(res);
        if (res) {
          fetchData()
        }
      } catch (error) {
        console.error('Error clearing data:', error);
      } 
      console.log(confData);
      confData ? setConfData(false) : setConfData(true)
    }
    
  };

  useEffect(() => {
    fetchData()
  }, [])


  const tableHeader = [
    { id: 1, title: "ID", style: "w-1/12 bg-green-500" },
    { id: 2, title: "Name", style: "w-2/12" },
    { id: 3, title: "Date", style: "w-2/12" },
    { id: 4, title: "Edit", style: "w-2/12" },
    { id: 5, title: "Delete", style: "w-1/12" },
  ]
  return (
    <div className="w-1/2 mx-auto mt-32">
      <ToastContainer />
      <form onSubmit={handleSubmit} className='flex flex-col gap-10'>

        <input
          className='border-2 border-gray-500 rounded-md py-2 '
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />



        <button type="submit" disabled={loading} className={`text-white ${loading ? "bg-gray-300": "bg-blue-700 "} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>Submit</button>

      </form>
     
      <button onClick={clearData} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear All Data</button>
      <div className="flex flex-col  mt-14">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {tableHeader.map((item) => <th key={item.id} className={`${item.style} px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase `}>
                      {item.title}
                    </th>)}

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">

                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 text-sm font-medium text-left text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                        <a
                          className="text-green-500 hover:text-green-700"
                          href="#"
                          onClick={() => EditItem(index)}
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                        <a
                          className="text-red-500 hover:text-red-700"
                          href="#"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}


                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
