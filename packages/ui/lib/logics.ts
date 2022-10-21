export function getInitial(name:string){
    let initial:string;
    if (name){
      if (name.includes(' ')){
        const fullName = name.split(' ');
        initial = fullName[0].charAt(0).toUpperCase() + fullName[1].charAt(0).toUpperCase();
      }else{
        initial = name.charAt(0).toUpperCase();
      }
      return initial;
    }
    return null
  }