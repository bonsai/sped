# NewProjectRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Name of the new project. | [optional] [default to undefined]
**location** | **string** | Path where the project should be created. | [optional] [default to undefined]
**dependencies** | **Array&lt;string&gt;** | Initial dependencies for the project. | [optional] [default to undefined]

## Example

```typescript
import { NewProjectRequest } from './api';

const instance: NewProjectRequest = {
    name,
    location,
    dependencies,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
