import React from 'react';
import {Field,reduxForm} from 'redux-form';

class  StreamForm extends React.Component{
    renderError({error,touched}){
        if(touched && error){
            return(
            <div className="ui error message">{error}</div>
            );
        }
    }
    renderInput = ({input,label,meta})=>{
        //return <input onChange={formProps.input.onChange} value={formProps.input.value}/>; OR
        //return <input {...formProps.input}/> OR destructure and pass {input} instead of formProps
        const className = `field ${meta.error && meta.touched ? 'error' :''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }
    onSubmit= (formValues) =>{
        console.log(formValues);
        this.props.onSubmit(formValues);
    }
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter name:" />
                <Field name="description" component={this.renderInput} label="Enter Description:"/>
                <button className="ui primary button">Submit</button>
            </form>
        );
    }
    
}

const validate = (formValues) =>{
    const errors = {}
    if(!formValues.title){
        errors.title='You must enter a title';
    }
    if(!formValues.description){
        errors.description='You must enter a description';
    }
    return errors;
}

export default reduxForm({
    form:'streamForm',
    validate:validate
})(StreamForm);


