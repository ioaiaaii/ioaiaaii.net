output "public_object_urls" {
  description = "Public URLs for each uploaded object in the GCS bucket"
  value = {
    for key, obj in local.objects_to_upload : key => "https://storage.googleapis.com/${module.gcs_bucket.name}/${obj.name}"
  }
}
