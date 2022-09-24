import React, { useState, useEffect, useCallback } from "react";
import _ from 'lodash';
import './search.css'
import Results from "../Results/Results";

export default function Search(props) {

    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('')
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        console.log('useefec')
        debounceCallback(query);
    }, [query])

    useEffect(() => {
        if(searchQuery) {
            setLoading(true)
            fetch(`https://api.github.com/search/repositories?q=${searchQuery.trim()}`).then((res)=>{
               return res.json()
            })
            .then((data) => {
                setLoading(false)
                setList(data.items)
                // console.log(data)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [searchQuery])
    /* debounce */
    let timer = 1500;
    let debounceTimeout;
    
    const debounceCallback = useCallback(debounceHandler, []);

    function debounceHandler(value) {
        if(debounceTimeout) {
            console.log('cleared')
            clearTimeout(debounceTimeout);
        }
        debounceTimeout = setTimeout(() => {
            setSearchQuery(value)
        }, timer)
    } 

    return(
        <>
            <div className="search-field">
                <input type="text" value={query} onChange={event => setQuery(event.target.value)}/>
            </div>
            {loading && 
                <span>Loading ...</span>
            }
            <Results list={list}/>
        </>
    )
}