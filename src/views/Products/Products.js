
import React, { Component } from 'react';
import Items from '../../components/Products/Items';
import axios from '../../axios';
// import { connect } from 'react-redux';
class Products extends Component {
    state = {
        products: []

    }
    // constructor(props) {
    //     super(props);

    // }

    componentDidMount() {
        axios.get('/products').then(res => {
            this.setState({ products: res.data.response.data })

        })
    }
    render() {
        // const productsss =this.props;
        const products = this.state.products.map((product , index) =>{
          return   <Items img={product.image}  key={index +'sad'} name={product.name} desc={product.description} />
        })
        return (
            <div className="row">
                {products}
            </div>
        );
    }
}

// const mapStateToProducts =(state)=>{
//     return{
//          product:state.product.products
//         }
// }
// export default connect(mapStateToProducts)(Products);

export default Products;