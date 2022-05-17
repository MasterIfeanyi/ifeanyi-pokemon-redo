import React from 'react'

const Pokemon = ({pokemon}) => {
  return (
    <div className="item">
        <label htmlFor="" className="item-text">
            {pokemon.pokemon}
        </label>
    </div>
  )
}

export default Pokemon