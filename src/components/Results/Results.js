import React, { useState } from "react";
import './results.css';

import sonar_results from "../../api";

function renderResults(list) {
    return (<div className="results">
        <ul>
            {
                list?.map((item) => {
                    return (<li key={item.id}>
                        <div className="list-item">
                            <div className="thumbnail">
                                <img src={item.owner.avatar_url} alt="owner-thumbnail"/>
                            </div>
                            <div className="details">
                                <div className="heading">
                                    <a href={item.html_url}>{item.full_name}</a>
                                </div>
                                <div className="desc">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                        </li>)
                })
            }
        </ul>
    </div>)
}

export default function Results(props) {
    return(
        <>
         {renderResults(props.list)}
        </>
    )
}