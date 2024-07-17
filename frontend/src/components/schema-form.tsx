import React, { useState } from "react";
import { createSchema } from "@/api/schema.api";
import { Button } from "./ui/button";

type Props={
    projectId:string
}

type FieldType = {
    name:string,
    type:string,
    required:boolean
}

const DEFAULTFIELD:FieldType={
    name:'',
    type:'',
    required:false
}

const SchemaForm =({projectId}:Props)=>{

    const [name,setName] = useState<string>("");
    const [fields,setFields] = useState<FieldType[]>([DEFAULTFIELD]);

    const handleFieldChange = (index:number,field:keyof FieldType,value:any)=>{
        const newFields:FieldType[] = [...fields];
       
        newFields[index]={...newFields[index],[field]:value};
        setFields(newFields);
    }

    const handleAddField =()=>{
        setFields([...fields,DEFAULTFIELD]);
    }

    const handleSubmit =async(event:React.FormEvent)=>{
        event.preventDefault();
        await createSchema(projectId,name,fields);
        setName('');
        setFields([DEFAULTFIELD]);
    }

    return (<div>
        <input 
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Shema name"
        />

        {fields.map((field,index)=>(
            <div key={field.name+"_"+index}>
                <input 
                type="text"
                value={field.name}
                onChange={(e)=>handleFieldChange(index,'name',e.target.value)}
                />
                <select
                aria-placeholder="Select field type"
                value={field.type}
                onChange={(e)=>handleFieldChange(index,"type",e.target.value)}
                
                >
                    <option value="text">Text</option>
                    <option value="image">image</option>
                    <option value="rich-text">Rich Text</option>
                </select>

                <input 
                type={'checkbox'}
                checked={field.required}
                onChange={(e)=>handleFieldChange(index,'required',e.target.checked)}
                >Required</input>
            </div>
        ))}

        {/* Submit */}
        <Button type='button' onClick={handleAddField} >Add Field</Button>
        <Button type='button' onClick={handleSubmit} >Save</Button>

    </div>);

}

export default SchemaForm;