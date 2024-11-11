variable "bucket_name" {
  description = "The name of the GCS bucket containing the objects"
  type        = string
}

variable "objects" {
  description = "A map of object names and their paths"
  type = map(object({
    name = string
  }))
}
