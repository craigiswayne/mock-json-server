ref: https://www.npmjs.com/package/json-server

### Notes:
[json-server](https://www.npmjs.com/package/json-server) is a great tool and the only reason I chose not to use it was because I needed a paginated response when fetching lists

If you don't need that, i'd recommend using json-server

### Supported Methods
* GET
* POST
* PUT
* DELETE

### Responses
ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
| Status Code | Description                                                   | Simulate                                                                         |
|-------------|---------------------------------------------------------------|----------------------------------------------------------------------------------|
| 500         | An error occurred with the rest server                        |
| 400         | User submitted an invalid request                             | Send through a request with a letter for a page number or a negative page number |
| 401         | Unauthorized request                                          | Send through a requet without an authorization header                            |
| 403         | User is authorized, but not permitted to access this resource |
| 404         | API endpoint does not exist                                   | Call any non-existent endpoint                                                   |
| 405         | Method not allowed                                            | 
| 409         | Conflicting data                                              | Try send a new POST request with the same id as an existing record | 
| 204         | No results                                                    | Call any GET endpoint with an insanely high page number, e.g. 999                |                                                     
| 200         | Request returns results                                       | Call any GET endpoint |


### Pagination Best Practices
* send pagination information as headers
    * https://code-maze.com/paging-aspnet-core-webapi/


### Paged/ Paginated Response
```
{
    results: T[];
    total: number;
    page: number;
    limit: number;
}
```   
| Property | Type           | Default | Description                                 |
| results  | T[]            | n/a     | An array of results for the current page    |
| total    | number, min: 1 | n/a     | Total number of results across all pages    |
| page     | number, min: 1 | 1       | The current page for the results returned   |
| limit    | number, min: 1 | 10      | The maximum number of results per page      |

#### Supported Query Params
| Param    | Description |
|----------|-------------|
| `page`   |
| `limit`  |
| `q`      |
