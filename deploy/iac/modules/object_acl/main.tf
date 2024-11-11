resource "google_storage_object_acl" "public_read" {
  for_each = var.objects

  bucket = var.bucket_name
  object = each.value.name
  predefined_acl = "publicRead"
}
