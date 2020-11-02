const isState={
    name:"Diwakar",
    isNav:false
  
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
    
  return state
}
export default reducer;