# DefaultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**projectGet**](#projectget) | **GET** /project | Get project details|
|[**projectPost**](#projectpost) | **POST** /project | Create a new project|

# **projectGet**
> ProjectDetails projectGet()

Retrieves details about the current Java project.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.projectGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ProjectDetails**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Project details retrieved successfully. |  -  |
|**404** | No project found. |  -  |
|**500** | Internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectPost**
> projectPost()

Creates a new Java project based on the provided details.

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    NewProjectRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let newProjectRequest: NewProjectRequest; // (optional)

const { status, data } = await apiInstance.projectPost(
    newProjectRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newProjectRequest** | **NewProjectRequest**|  | |


### Return type

void (empty response body)

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Project created successfully. |  -  |
|**400** | Invalid project details. |  -  |
|**500** | Internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

