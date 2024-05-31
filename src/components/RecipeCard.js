import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

const RecipeCard = ({ recipe, onDelete}) => {

    const handleDelete = async () => {
        const {data, error } = await supabase
            .from('recipes')
            .delete()
            .eq('id', recipe.id)
            .select()

        if (error) {
            console.log(error)

        }
        if (data) {
            console.log(data)
            onDelete(recipe.id )
        }

    }
    return (
        <div className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.method}</p>
            <div className="rating">{recipe.rating}</div>
        
            <div className="nuttons">
                <Link to={'/' + recipe.id} >
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default RecipeCard