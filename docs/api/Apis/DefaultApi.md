# DefaultApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiInfoGet**](DefaultApi.md#apiInfoGet) | **GET** /api/info | Get resume information |
| [**apiLiveGet**](DefaultApi.md#apiLiveGet) | **GET** /api/live | Get live performances |
| [**apiProjectsGet**](DefaultApi.md#apiProjectsGet) | **GET** /api/projects | Get projects |
| [**apiReleasesGet**](DefaultApi.md#apiReleasesGet) | **GET** /api/releases | Get releases |


<a name="apiInfoGet"></a>
# **apiInfoGet**
> Resume apiInfoGet()

Get resume information

    Returns resume data including personal information, experience, and education.

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

Get live performances

    Returns a list of live performances.

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

Get projects

    Returns a list of engineering or other website projects.

### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](../Models/WebsiteProjectEntry.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="apiReleasesGet"></a>
# **apiReleasesGet**
> List apiReleasesGet()

Get releases

    Returns a list of releases (e.g., albums or content created by the artist).

### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](../Models/Release.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

