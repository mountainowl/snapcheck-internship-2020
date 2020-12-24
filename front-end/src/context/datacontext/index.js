import {useState, useEffect} from 'react';

import axios from 'axios';
import amountFormat from '../../util/amountFormat';
import Datacontext from './context';

axios.defaults.baseURL = 'http://localhost:3001';

const DataProvider = ({children}) => {
    const [main, setMain] = useState([]);

    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);;
    const [singleItem, setSingleItem] = useState({});

    useEffect(() => {
        ( async () => {
            const {data} = await axios.get('/users');
            setItems(data.filter(itm => itm.first_name.toLowerCase().includes(search.toLowerCase()) || itm.last_name.toLowerCase().includes(search.toLowerCase()) || itm.order_total.amount.toString().includes(search)));
        })()
        
   }, [search, singleItem])


    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSingleItem = (id) => {
        let item = items.filter((itm) => itm.id === id);
        setSingleItem(item[0]);
        setSingleItem((prevState) => ({
            ...prevState,
            order_total: {
                ...prevState.order_total,
                amount: amountFormat(item[0].order_total.amount)
            }
        }))
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSingleItem((prevState) => ({
            ...prevState,
            [name]: value,
            address: {
                ...prevState.address,
                [name]: value,
            },
            order_total:{
                ...prevState.order_total,
                [name]: value
            } 
            
        }))
    }

    const updateUserData = async (id) => {
        const updatingItem = {
            "first_name": singleItem["first_name"],
            "last_name": singleItem["last_name"],
            "address": {
                "address1": singleItem["address"]["address1"],
                "address2": singleItem["address"]["address2"],
                "city": singleItem["address"]["city"],
                "state": singleItem["address"]["state"],
                "zip": singleItem["address"]["zip"],
            },
            "gender": singleItem["gender"],
            "age": singleItem["age"],
            "order_total": {
                "amount": singleItem["order_total"]["amount"] * 100,
                "currency": singleItem["order_total"]["currency"],
            }
        }

        const {data} = await axios.put(`/users/${id}`, updatingItem);
        setSingleItem(data);
    }

    const deleteUserData = async (id) => {
        await axios.delete(`/users/${id}`);
        setSingleItem({})
    }
    return (
        <Datacontext.Provider value={{
                search,
                items,
                singleItem,
                handleSearch,
                handleSingleItem,
                handleChange,
                updateUserData,
                deleteUserData,
            }}
        >
            {children}
        </Datacontext.Provider>
    )
}

export default DataProvider;