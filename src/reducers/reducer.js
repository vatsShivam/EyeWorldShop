const isState={
    name:"Diwakar",
    isNav:false,
    addCart:[],
  
}



const reducer=(state=isState,action )=>{
    console.log(action)
    if(action.type==="CHANGE_NAME"){
        return {
            name:action.payload
        }
    }
    if(action.type==="CHANGE_NAV"){
        
          if(state.isNav===false){
            return {
                isNav:true
            }
          }
          if(state.isNav===true){
            return {
                isNav:false
            }
          }
        
    }
    if(action.type==="Add Cart"){

      return {
        addedItems: [...state.addedItems, action.payload], 
      }
    }
    
  return state
}
export default reducer;