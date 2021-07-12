import React, { Component } from 'react';
import { Container, ListGroupItem, Button, ListGroup, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, addItem} from './actions/itemActions';
import PropTypes from 'prop-types';
//const {v4 : uuid} = require('uuid');
//we use uuid()here temporarily for now becoz we have not connected backend yet!!


class List extends Component {
    /*state={
        items: [
            { id: uuid(), name: 'Milk1'},
            { id: uuid(), name: 'Milk2'},
            { id: uuid(), name: 'Milk3'},
            { id: uuid(), name: 'Milk4'},
            { id: uuid(), name: 'Milk5'},
        ]
    }*/
    //we will use lifecycle method
    state ={
        modal: false,
        name:''
    }
    toggle = () =>{
        this.setState({
            modal: !this.state.modal
        });
    }
    onChange=e=>{
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit=e=>{
        e.preventDefault();

        const newItem = {
            //id : uuid(),           //as we connected b
            name: this.state.name
        }
        //add item via additem action
        this.props.addItem(newItem);

        //closeModal
        this.toggle();
    }
    componentDidMount(){
        this.props.getItems();
    }
    onDeleteClick=id=>{
        this.props.deleteItem(id);
    }
    render() {
        
        const { items } = this.props.item;
        return (
            <Container>
                <Button
                    color = "dark"
                    style={{marginTop: '2rem'}}
                    onClick={this.toggle
                        /*()=>{ 
                        const name = prompt('Enter item ');
                        if(name){
                            this.setState( state=>({
                                items: [...state.items, { id: uuid(), name}]//learn this
                            }))///////////  ... is spread operator
                        }
                    }*/}>Add Item
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}    
                >
                    <ModalHeader toggle={this.toggle}>Add to List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add item"
                                    onChange={this.onChange}
                                ></Input>
                                <Button
                                    color="dark"
                                    style={{marginTop:"2rem"}}
                                    block
                                >Add</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id,name})=>(//learn this as well
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger" size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id) /*()=>{
                                            this.setState(state=>({
                                                //items: state.items.filter(item=>item.id!==id)//learn it
                                            }))
                                        }*/}
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}
////REDUX//////////
List.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    item: state.item
});
export default  connect(mapStateToProps, {getItems,deleteItem,addItem})(List);
///////REDUX///////////////