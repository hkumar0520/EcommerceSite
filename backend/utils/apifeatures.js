
class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                // below i means, case sensitive both lowercase & uppercase are different words 
                $options: "i",
            },
        }:{};

        // console.log(keyword);

        this.query = this.query.find({...keyword});

        return this;
    }

    filter(){
        // in javascript , all objects passed through reference,
        // so if we make any changes in queryCopy, changes also reflect in queryStr
        // const queryCopy = this.queryStr

        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);

        // Removing some fields for category, limit is related to page
        const removefields = ["keyword","page","limit"]

        removefields.forEach(key => delete queryCopy[key]);

        // console.log(queryCopy);

        // filter for Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        // gt-> $gt
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)

        // console.log(queryCopy);
        // this.query = this.query.find(queryCopy);

        // console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        console.log(this.queryStr.page);
        const currentPage =  Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;

