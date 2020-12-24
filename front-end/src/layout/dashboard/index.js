import {useContext} from 'react';
import {Link} from 'react-router-dom';
import Authcontext from '../../context/authcontext/context';
import Datacontext from '../../context/datacontext/context';

import amountFormat from '../../util/amountFormat';


import Navbar from '../../components/navbar';

const Dashboard = () => {
    const {authenticated, user, logout} = useContext(Authcontext);
    const {search, items, handleSearch} = useContext(Datacontext);
    console.log(items);


    if(!authenticated) {
        return null;
    }
    return (
        <div>
            <Navbar />
            <div className={`filter_container`}>
                <input type="search" value={search} onChange={handleSearch} placeholder="search with first name last name or amount" />
            </div>
            <div className={`container`}>
                {items && items.map((item, index) => (
                    <div key={index} className={`item`}>
                        
                        <h1>
                            <span>{item["first_name"]}</span>{' '}
                            <span>{item["last_name"]}</span>
                            <Link to={`user/${item["id"]}`} className={`btn-edit`}>
                            <button>edit</button>
                            </Link>
                        </h1>
                        
                        <h3>
                            <span>{item["address"]["address1"]}</span>-{' '}
                            <span>{item["address"]["address2"]}</span>, {' '}
                            <span>{item["address"]["city"]}</span>,{' '}
                            <span>{item["address"]["state"]}</span>,{' '}
                            <span>{item["address"]["zip"]}</span>{'  '}
                        </h3>
                        <p>Gender: {item["gender"]}</p>
                        <p>Age: {item["age"]}</p>

                        <code>
                            Order Total: {amountFormat(item["order_total"]["amount"])}{'  '}{item["order_total"]["currency"]}
                        </code>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;