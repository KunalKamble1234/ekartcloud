// for getting information of currently logged in user

// Function to set the logged-in user's information in local storage
  export const setLoggedInUser = (user) => {
    removeLoggedInUser();
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };
  
  // Function to get the logged-in user's information from local storage
  export const getLoggedInUser = () => {
    const user = localStorage.getItem("loggedInUser");
    return user ? JSON.parse(user) : null;
  };
  export const removeLoggedInUser = () => {
    localStorage.removeItem("loggedInUser");
  };
  window.getLoggedInUser = getLoggedInUser;

  export const setOrderItem = (item) => {
    removeOrderitem();
    localStorage.setItem("orderItem", JSON.stringify(item));
  }

  export  const getOrderItem = () => {
    const orderItem = localStorage.getItem("orderItem");
    return orderItem ? JSON.parse(orderItem) : null;
  }

  export const removeOrderitem = () => {
    localStorage.removeItem("orderItem");
  }

  // searchVal
  export const setSearchval = (item) => {
    removeSearchval();
    window.item = item;
    // let finalString = item.replace(/[']+/g, '');
    localStorage.setItem("searchval", JSON.stringify(item));
  }

  export const getSearchval = () => {
    const searchval = localStorage.getItem("searchval");
    return searchval;
  }

  export const removeSearchval = () => {
    localStorage.removeItem("searchval");
  }
  window.getSearchval = getSearchval();

  // category selected

  export const setCatSel = (cat) => {
    removeCatSel();
    localStorage.setItem("catSel", JSON.stringify(cat));
  }
  export const getCatSel = () => {
    let cat = localStorage.getItem("catSel");
    return cat; 
  }

  export const removeCatSel = () => {
    localStorage.removeItem("catSel");
  }