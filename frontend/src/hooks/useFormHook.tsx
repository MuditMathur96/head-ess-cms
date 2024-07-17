import React, { useState } from 'react'
import { ZodIssue, ZodSchema } from 'zod'

type Props<T> = {
    schema:ZodSchema<T>
}

function useFormHook<T>({
    schema
}: Props<T>) {

  const [errors,setErrors] = useState<ZodIssue[]>([]);

  const verify =(data:T)=>{
    const isValid = schema.safeParse(data);

    if(!isValid.success) {
        setErrors(isValid.error.issues);
        return false;
    }

    setErrors([]);
    return true;
  }

  return {verify,errors};
}

export default useFormHook