import React, { Component } from 'react';

const teamMembers = [
    {id: 1, name: 'Bryan', industry: 'WWCO'},
    {id: 2, name: 'Danier', industry: 'WWCO'},
    {id: 3, name: 'Hillary', industry: 'WWCO'},
    {id: 4, name: 'Mario', industry: 'WWCO'},
]

class Teams extends Component {
    state = {
        data: teamMembers
    }
    render (){
        console.log('hey', this.state.data)
        return (
            <div>
                <div>
                    <h3 className="text-3xl font-medium text-gray-700">Teams</h3>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>INDUSTRY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((team, i) => (
                            <tr key={i}>
                                <td><a href={`${team.id}`}>{team.id}</a></td>
                                <td>{team.name}</td>
                                <td>{team.industry}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    
}

export default Teams;
