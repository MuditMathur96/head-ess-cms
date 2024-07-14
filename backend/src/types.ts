export interface LifecycleHooks{
    beforeSave?:(content:any)=>Promise<void>;
    afterSave?:(content:any)=>Promise<void>;
    beforeDelete?:(content:any)=>Promise<void>;
    afterDelete?:(content:any)=>Promise<void>
}