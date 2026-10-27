import axios from "axios";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/gallery-image";

export const getGalleryImages = () => axios.get(API);