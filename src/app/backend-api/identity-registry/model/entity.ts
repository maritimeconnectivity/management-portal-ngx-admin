export interface Entity { 
    /**
     * The ID of the entity in the form of a sequential integer
     */
     readonly id?: number;
     /**
      * The time that the entity was created
      */
     readonly createdAt?: Date;
     /**
      * The time that the entity was last updated
      */
     readonly updatedAt?: Date;
}