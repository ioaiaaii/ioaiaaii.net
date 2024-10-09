# DefaultApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiInfoGet**](DefaultApi.md#apiInfoGet) | **GET** /api/info | Get Resume Information |
| [**apiLiveGet**](DefaultApi.md#apiLiveGet) | **GET** /api/live | Get Live Performances |
| [**apiProjectsGet**](DefaultApi.md#apiProjectsGet) | **GET** /api/projects | Get Website Projects |
| [**apiReleasesGet**](DefaultApi.md#apiReleasesGet) | **GET** /api/releases | Get Releases |


<a name="apiInfoGet"></a>
# **apiInfoGet**
> Resume apiInfoGet()

Get Resume Information

    Retrieve the profile resume data.

### Parameters
This endpoint does not need any parameter.

### Return type

[**Resume**](../Models/Resume.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="apiLiveGet"></a>
# **apiLiveGet**
> List apiLiveGet()

Get Live Performances

    Retrieve all live performances.

### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](../Models/LivePerformance.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="apiProjectsGet"></a>
# **apiProjectsGet**
> List apiProjectsGet()

Get Website Projects

    Retrieve all website-related projects.

### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](../Models/WebsiteProject.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="apiReleasesGet"></a>
# **apiReleasesGet**
> List apiReleasesGet()

Get Releases

    Retrieve all music releases.

### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](../Models/Release.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

