export default class ApiFeatures {
    constructor(mongooesQuery, queryString) {
        this.mongooesQuery = mongooesQuery;
        this.queryString = queryString;
    }

    pagination() {
        let page=this.queryString.page * 1 ||1
        if(this.queryString <=0) {page =1};
        let skip=(page-1)*4;
        this.page=page
        this.mongooesQuery.skip(skip).limit(4);
        return this;
    }

    filter() {
        let filterObj = { ...this.queryString };
        let excludedFields = ["page", "sort", "keyword", "fields"];
        excludedFields.forEach(q => delete filterObj[q]);

        let filterStr = JSON.stringify(filterObj);
        filterStr = filterStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filterObj = JSON.parse(filterStr);

        this.mongooesQuery = this.mongooesQuery.find(filterObj);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooesQuery = this.mongooesQuery.sort(sortBy);
        }
        return this;
    }

    search() {
        if (this.queryString.keyword) {
            this.mongooesQuery = this.mongooesQuery.find({
                $or: [
                    { title: { $regex: this.queryString.keyword, $options: "i" } },
                    { description: { $regex: this.queryString.keyword, $options: "i" } }
                ]
            });
        }
        return this;
    }

    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(",").join(" ");
            console.log(fields);
              // This should return a string, not an array
            this.mongooesQuery = this.mongooesQuery.select(fields);  // You're selecting fields here
        }
        return this;
    }
    
}
