locals {
  base_path = "../../website/public"
  
  objects_to_upload = {
    favicon = {
      name         = "favicon.png"
      source       = "${local.base_path}/favicon.png"
      cache_control = "public, max-age=2592000"
      content_type = "image/png"
    },
    profile = {
      name         = "assets/images/home/profile.png"
      source       = "${local.base_path}/assets/images/home/profile.png"
      cache_control = "public, max-age=2592000"
      content_type = "image/png"
      predefined_acl = "publicRead"
    },
    dec_pdc_back = {
      name         = "assets/images/releases/dec-pdc/back_90_1500_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/dec-pdc/back_90_1500_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    dec_pdc_front = {
      name         = "assets/images/releases/dec-pdc/front_90_1500_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/dec-pdc/front_90_1500_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    dec_pdc_record = {
      name         = "assets/images/releases/dec-pdc/record_90_1500_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/dec-pdc/record_90_1500_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    nsa_front = {
      name         = "assets/images/releases/nsa/front_90_1500_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/nsa/front_90_1500_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    nsa_inner = {
      name         = "assets/images/releases/nsa/inner_a_90_1500_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/nsa/inner_a_90_1500_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    diataxis_front = {
      name         = "assets/images/releases/diataxis/front_lohalo_90_1500_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/diataxis/front_lohalo_90_1500_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    diataxis_back = {
      name         = "assets/images/releases/diataxis/back_lohalo_90_1500_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/diataxis/back_lohalo_90_1500_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    diataxis_s = {
      name         = "assets/images/releases/diataxis/front_lohalo_90_1500_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/diataxis/front_lohalo_90_1500_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    telepresence_front = {
      name         = "assets/images/releases/telepresence/front_1200_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/telepresence/front_1200_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    telepresence_cassete = {
      name         = "assets/images/releases/telepresence/cassete_1500_90_v1.jpg"
      source       = "${local.base_path}/assets/images/releases/telepresence/cassete_1500_90_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    live_studio = {
      name         = "assets/images/live/studio_2024_3000_v1.jpg"
      source       = "${local.base_path}/assets/images/live/studio_2024_3000_v1.jpg"
      cache_control = "public, max-age=2592000"
      content_type = "image/jpeg"
    },
    montserrat_font = {
      name         = "assets/fonts/Montserrat-VariableFont_wght.ttf"
      source       = "${local.base_path}/assets/fonts/Montserrat-VariableFont_wght.ttf"
      cache_control = "public, max-age=2592000"
      content_type = "font/ttf"
    }
  }
}


module "gcs_bucket" {
  source        = "git::https://github.com/GoogleCloudPlatform/cloud-foundation-fabric.git//modules/gcs?ref=v35.0.0"
  name          = "ioaiaaii-website-static-content"
  project_id    = var.project
  location      = var.location
  storage_class = "STANDARD"
  uniform_bucket_level_access = false # to use acl per object
  
  objects_to_upload = local.objects_to_upload
}


module "object_acl" {
  source      = "./modules/object_acl"
  bucket_name = module.gcs_bucket.name
  
  # Passing only the object names to the ACL module
  objects = { 
    for key, obj in local.objects_to_upload : key => { name = obj.name }
  }
}