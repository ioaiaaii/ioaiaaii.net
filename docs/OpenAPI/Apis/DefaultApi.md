# DefaultApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiInfoGet**](DefaultApi.md#apiInfoGet) | **GET** /api/info | Get Resume Information |
| [**apiIoaiaaiiGet**](DefaultApi.md#apiIoaiaaiiGet) | **GET** /api/ioaiaaii | Get Profile Information |
| [**apiLiveGet**](DefaultApi.md#apiLiveGet) | **GET** /api/live | Get Live Performance Information |
| [**apiProjectsGet**](DefaultApi.md#apiProjectsGet) | **GET** /api/projects | Get Project Information |
| [**apiReleasesGet**](DefaultApi.md#apiReleasesGet) | **GET** /api/releases | Get Release Information |


<a name="apiInfoGet"></a>
# **apiInfoGet**
> Resume apiInfoGet()

Get Resume Information

    Returns resume details.

### Parameters
This endpoint does not need any parameter.

### Return type

[**Resume**](../Models/Resume.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="apiIoaiaaiiGet"></a>
# **apiIoaiaaiiGet**
> Profile apiIoaiaaiiGet()

Get Profile Information

    Returns personal profile information.

### Parameters
This endpoint does not need any parameter.

### Return type

[**Profile**](../Models/Profile.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="apiLiveGet"></a>
# **apiLiveGet**
> LivePerformance apiLiveGet()

Get Live Performance Information

    Returns information on live performances.

### Parameters
This endpoint does not need any parameter.

### Return type

[**LivePerformance**](../Models/LivePerformance.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="apiProjectsGet"></a>
# **apiProjectsGet**
> WebsiteProjectEntry apiProjectsGet()

Get Project Information

    Returns information on projects.

### Parameters
This endpoint does not need any parameter.

### Return type

[**WebsiteProjectEntry**](../Models/WebsiteProjectEntry.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="apiReleasesGet"></a>
# **apiReleasesGet**
> Release apiReleasesGet()

Get Release Information

    Returns information on musical releases.

### Parameters
This endpoint does not need any parameter.

### Return type

[**Release**](../Models/Release.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

