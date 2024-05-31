import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import RecipeCard from "../components/RecipeCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [recipes, setRecipes] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setRecipes(prevRecipes => {
      return prevRecipes.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      const {data, error} = await supabase
        .from('recipes')
        .select()
        .order(orderBy, {ascending: false})

        if (error) {
          setFetchError("Could not fetch the smoothis")
          setRecipes(null)
          console.log(EvalError)
        }
        if (data) {
          setRecipes(data)
          setFetchError(null)
        }
    }

    fetchRecipes()
  }, [orderBy])




  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {recipes && (
        <div className="recipes">
          <div className="recipe-grid">
            <div className="order-by">
              <p>Order By:</p>
              <button onClick={() => setOrderBy('created_at')}>Time Created</button>
              <button onClick={() => setOrderBy('title')}>Title</button>
              <button onClick={() => setOrderBy('rating')}>Rating</button>
              {orderBy}
            </div>
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home